import React, { Component } from 'react'
import Chat from './Chat'

export default class Body extends Component {

    chatsListWrapper = React.createRef();

    getSnapshotBeforeUpdate(prevprops,prevstate){
        if(prevprops.chatsList.length !== this.props.chatsList.length){
            return this.chatsListWrapper.current.scrollHeight;
        }
        return null;
    }

    componentDidUpdate(prevprops,prevstate,snapshot){
        if(null !== snapshot){
            const wrapper = this.chatsListWrapper.current;
            wrapper.scrollTop = wrapper.scrollHeight - snapshot;
        }
    }

    render() {
        const chats = this.props.chatsList.map((chat, index) => {
            const isLeft = 'recieve' === chat.type;
            return <Chat
                key={index}
                time={chat.time}
                message={chat.message}
                gravatar={isLeft ? this.props.gravatars.user2 : this.props.gravatars.user1}
                isLeft={isLeft} />
        })

        return (
            <div
                ref={this.chatsListWrapper}
                onScroll={this.props.handelScroll}
                className="panel-body">
                <div className="chats">
                    {chats}
                </div>
            </div>

        )
    }
}
