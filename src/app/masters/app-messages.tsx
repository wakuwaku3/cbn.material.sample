import * as React from 'react';
import { messagesAction } from '../actions/shared/messages-action';
import { MessageContainer } from '../components/messages/message-container';
import { withStore } from '../../lib/shared/react-frxp';

namespace InnerScope {
  export const component = withStore(messagesAction)(() => (
    <MessageContainer
      messages={messagesAction.store.messages}
      onClose={i => messagesAction.next('removeMessage', i)}
    />
  ));
}
export const AppMessages = InnerScope.component;
