import React from 'react';

export default ({comments}) => {
    const getCommentText = (comment) => {
        if (comment.status === 'rejected') {
            return 'comment rejected';
        } else if (comment.status === 'pending') {
            return 'comment under revision';
        } else if (comment.status === 'approved') {
            return comment.content;
        }
    }

    const renderedComments = comments.map(comment => {
        console.log(comment.content, comment.status);
        return <li key={comment.id}>{getCommentText(comment)}</li>;
    });

    return <ul>{renderedComments}</ul>;
};

