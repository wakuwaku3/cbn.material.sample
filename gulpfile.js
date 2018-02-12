let {
    clean,
    restore,
    build,
    test,
    pack,
    publish,
    run
} = require('gulp-dotnet-cli');
let gulp = require('gulp');
let path = require('path');
let runSequence = require('run-sequence');
var spawn = require("child_process").spawn;

let web = '**/cbn.react.sample.csproj';
let appentries = [web];
let testentries = [];
let entries = appentries.concat(testentries);

//clean
gulp.task('clean', () => {
    return gulp.src('**/*.csproj', { read: false }).pipe(clean());
});
//restore nuget packages
gulp.task('restore', () => {
    return gulp.src(entries, { read: false }).pipe(restore());
});
//compile
gulp.task('build', cb => {
    return runSequence(
        ['build:dotnet', 'build:webpack'],
        cb
    );
});
gulp.task('build:webpack', () => {
    let webpack = spawn('webpack', { shell: true });
    webpack.stdout.on("data", data => console.log("stdout: " + data));
    webpack.stderr.on("data", data => console.log("stdout: " + data));
    return webpack;
});
gulp.task('build:dotnet', () => {
    return gulp.src(entries, { read: false }).pipe(build());
});
//run unit tests
gulp.task('test', () => {
    return gulp.src(testentries, { read: false }).pipe(test());
});
//compile and publish an application to the local filesystem
gulp.task('publish', cb => {
    return runSequence(
        'test',
        ['publish:web'],
        cb
    );
});
gulp.task('publish:web', () => {
    let output = path.join(process.cwd(), 'dist', 'web');
    let webpack = spawn('webpack -p', { shell: true });
    webpack.stdout.on("data", data => console.log("stdout: " + data));
    webpack.stderr.on("data", data => console.log("stdout: " + data));
    return webpack.on("exit", data => {
        return gulp
            .src('cbn.react.sample.csproj', { read: false })
            .pipe(publish({ configuration: 'Release', output: output }));
    });
});
//run
gulp.task('run', cb => {
    return runSequence(
        ['run:dotnet', 'run:webpack'],
        cb
    );
});
gulp.task('run:dotnet', () => {
    return gulp.src('cbn.react.sample.csproj', { read: false }).pipe(run());
});
gulp.task('run:webpack', () => {
    let webpack = spawn('webpack -w', { shell: true });
    webpack.stdout.on("data", data => console.log("stdout: " + data));
    webpack.stderr.on("data", data => console.log("stdout: " + data));
    return webpack;
});
