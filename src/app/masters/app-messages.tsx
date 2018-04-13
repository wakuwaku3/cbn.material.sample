import * as React from 'react';
import { decorateWithStore } from '../helper/app-style-helper';
import { messagesAction } from '../actions/shared/messages-action';
import { MessageContainer } from '../components/messages/message-container';

namespace InnerScope {
    const style = {};
    export const component = decorateWithStore(style, messagesAction.key)(
        sheet => props => (
            <MessageContainer
                messages={messagesAction.model.messages}
                onClose={i => messagesAction.emit('removeMessage', i)}
            />
        )
    );
}
export const AppMessages = InnerScope.component;
