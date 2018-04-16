const {
    clean,
    restore,
    build,
    test,
    pack,
    publish,
    run
} = require('gulp-dotnet-cli');
const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const spawn = require('child_process').spawn;

const webprj = 'cbn.material.sample.csproj';
const web = `**/${webprj}`;
const appentries = [web];
const testentries = [];
const entries = appentries.concat(testentries);

// set-env
gulp.task('set-env:dev', () => {
    return (process.env.NODE_ENV = 'development');
});
gulp.task('set-env:prod', () => {
    return (process.env.NODE_ENV = 'production');
});
//clean
gulp.task('clean', ['set-env:dev'], () => {
    return gulp.src('**/*.csproj', { read: false }).pipe(clean());
});
//restore nuget packages
gulp.task('restore', ['set-env:dev'], () => {
    return gulp.src(entries, { read: false }).pipe(restore());
});
//compile
gulp.task('build', ['set-env:dev'], cb => {
    return runSequence(['build:dotnet', 'build:webpack'], cb);
});
gulp.task('build:webpack', () => {
    let webpack = spawn('webpack', { shell: true });
    webpack.stdout.on('data', data => console.log('stdout: ' + data));
    webpack.stderr.on('data', data => console.log('stdout: ' + data));
    return webpack;
});
gulp.task('build:dotnet', () => {
    return gulp.src(entries, { read: false }).pipe(build());
});
//run unit tests
gulp.task('test', ['set-env:prod'], () => {
    return gulp.src(testentries, { read: false }).pipe(test());
});
//compile and publish an application to the local filesystem
gulp.task('publish', cb => {
    return runSequence('test', ['publish:web'], cb);
});
gulp.task('publish:web', () => {
    let output = path.join(process.cwd(), 'dist', 'web');
    let webpack = spawn('webpack', { shell: true });
    webpack.stdout.on('data', data => console.log('stdout: ' + data));
    webpack.stderr.on('data', data => console.log('stdout: ' + data));
    return webpack.on('exit', data => {
        return gulp
            .src(webprj, { read: false })
            .pipe(publish({ configuration: 'Release', output: output }));
    });
});
//run
gulp.task('run', ['set-env:dev'], cb => {
    return runSequence(['run:dotnet', 'run:webpack'], cb);
});
gulp.task('run:dotnet', () => {
    return gulp.src(webprj, { read: false }).pipe(run());
});
gulp.task('run:webpack', () => {
    let webpack = spawn('webpack -w', { shell: true });
    webpack.stdout.on('data', data => console.log('stdout: ' + data));
    webpack.stderr.on('data', data => console.log('stdout: ' + data));
    return webpack;
});
