// Tutorial 06 - dispatch-action.js

// So far we've focused on building our reducer(s) and we haven't dispatched any of our own actions.
// We'll keep the same reducers from our previous tutorial and handle a few actions:

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
var store_0 = createStore(reducer)


console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// Let's dispatch our first action... Remember in 'simple-action-creator.js' we said:
//     "To dispatch an action we need... a dispatch function." Captain obvious

// The dispatch function we're looking for is provided by Redux and will propagate our action
// to all of our reducers! The dispatch function is accessible through the Redux
// instance property "dispatch"

// To dispatch an action, simply call:

store_0.dispatch({
    type: 'AN_ACTION'
})
// Output:
// userReducer was called with state {} and action { type: 'AN_ACTION' }
// itemsReducer was called with state [] and action { type: 'AN_ACTION' }

// Each reducer is effectively called but since none of our reducers care about this action type,
// the state is left unchanged:

console.log('store_0 state after action AN_ACTION:', store_0.getState())
// Output: store_0 state after action AN_ACTION: { user: {}, items: [] }

// But, wait a minute! Aren't we supposed to use an action creator to send an action? We could indeed
// use an actionCreator but since all it does is return an action it would not bring anything more to
// this example. But for the sake of future difficulties let's do it the right way according to
// flux theory. And let's make this action creator send an action we actually care about:

var setNameActionCreator = function (name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}

store_0.dispatch(setNameActionCreator('bob'))
// Output:
// userReducer was called with state {} and action { type: 'SET_NAME', name: 'bob' }
// itemsReducer was called with state [] and action { type: 'SET_NAME', name: 'bob' }

console.log('store_0 state after action SET_NAME:', store_0.getState())
// Output:
// store_0 state after action SET_NAME: { user: { name: 'bob' }, items: [] }

// We just handled our first action and it changed the state of our application!

// But this seems too simple and not close enough to a real use-case. For example,
// what if we'd like do some async work in our action creator before dispatching
// the action? We'll talk about that in the next tutorial "dispatch-async-action.js"

// So far here is the flow of our application
// ActionCreator -> Action -> dispatcher -> reducer

// Go to next tutorial: 07_dispatch-async-action-1.js


var data = {
    "id":"123",
    "author":{
        "id":"1",
        "name":"James"
    },
    "title":"My awesome blog post",
    "content": "This is the content for blog post 123. Lorem ipsum dolor sit amet",
    "comments":[
        {
            "id":"324",
            "commenter":{
                "id":"2",
                "name":"Nicole"
                "content": "Comment 324. This is the content for comment 324"
            }
        },
        {
            "id":"325",
            "commenter":{
                "id":"3",
                "name":"Ricky"
                "content": "Comment 325. This is the content for comment 325"
            }
        },
    ]
}


import { normalize, schema } from 'normalizr';

// Define a users schema
const user = new schema.Entity('users');

// Define your comments schema
const comment = new schema.Entity('comments', {
    commenter: user
});

// Define your article 
const article = new schema.Entity('articles', { 
    author: user,
    comments: [ comment ]
});

const normalizedData = normalize(data, article);
console.log('application data after a call to normalize', JSON.stringify(normalizedData, null, 2));

/* normalized view of data
{
  result: "123",
  entities: {
    "articles": { 
      "123": { 
        id: "123",
        author: "1",
        title: "My awesome blog post",
        comments: [ "324" ]
      }
    },
    "users": {
      "1": { "id": "1", "name": "James" },
      "2": { "id": "2", "name": "Nicole" }
    },
    "comments": {
      "324": { id: "324", "commenter": "2" }
    }
  }
}
*/

var authorReducer = function(state = {}, action) {
    console.log('authorReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_AUTHOR_NAME':
            return {
                ...state,
                id: action.id
                name: action.name
            }
        default:
            return state;
    }
}

var titleReducer = function(state = {}, action) {
    console.log('titleReducer was called with state', state, 'and action', action)
    
    switch (action.type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: action.name
            }
        default:
            return state;
    }

    return state;
}

var contentReducer = function(state = {}, action) {
    console.log('contentReducer was called with state', state, 'and action', action)
    
    switch (action.type) {
        case 'SET_CONTENT':
            return {
                ...state,
                content: action.content
            }
        default:
            return state;
    }

    return state;
}

var commentReducer = function(state = [], action) {
    console.log('commentReducer was called with state', state, 'and action', action)
    
    switch (action.type) {
        case 'SET_COMMENT':
            return {
                ...state,
                comments: action.comment
            }
        default:
            return state;
    }

    return state;
}

var reducer_2 = combineReducers({
    author: authorReducer,
    title: titleReducer,
    content: contentReducer,
    comments: commentReducer
})
var store_1 = createStore(reducer_2)


console.log("\n", '### It starts here')
console.log('store_1 state after initialization:', store_1.getState())

var setAuthorNameActionCreator = function (author) {
    return {
        type: 'SET_AUTHOR_NAME',
        author: {
            id: author.id,
            name: author.name
        }
    }
}

var setTitleActionCreator = function (title) {
    return {
        type: 'SET_TITLE',
        title: title
    }
}

var setContentActionCreator = function (content) {
    return {
        type: 'SET_CONTENT',
        content: content
    }
}

var setCommentActionCreator = function (comment) {
    return {
        type: 'SET_COMMENT',
        comment: {
            id: comment.id",
            commenter: {
                id: comment.commenter.id,
                name: comment.commenter.name
                content: comment.commenter.content
            }
        }
    }
}

// fire off a series of actions to build initial state
store_1.dispatch(setAuthorNameActionCreator('Jim'))

console.log('store_1 state after action SET_AUTHOR_NAME:', store_1.getState())
