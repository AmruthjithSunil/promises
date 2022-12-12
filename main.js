const posts = [
    { title: 'Post One', body: 'This is post one', createdAt: new Date().getTime()},
    { title: 'Post Two', body: 'This is post two', createdAt: new Date().getTime()}
];

let lastEditedInMilliSeconds = new Date().getTime();

function itsBeen(x){
    return Math.floor(((new Date().getTime())-x)/1000);
}

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post) => {
            output += `<li>${post.title} created ${itsBeen(post.createdAt)} seconds ago</li>`;
        });
        document.body.innerHTML = output;
    }, 500)
}

function lastEditedInSecondsAgo(){
    return `<p>Last Edited ${itsBeen(lastEditedInMilliSeconds)} seconds ago</p>`
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            post.createdAt = new Date().getTime();
            posts.push(post);

            const error = false;

            if(!error){
                resolve();
            } else {
                reject('Error: Something went wrong')
            }
        }, 500);
    })
}

function deletePost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(posts.length){
                posts.pop();
                getPosts();
                resolve();
            } else {
                reject();
            }
        }, 1000)
    })
}

createPost({ title: 'Post Three', body: 'This is post three'})
.then(getPosts)
.catch(err => console.log(err));

Promise.all([deletePost(), deletePost(), deletePost(), deletePost()])
.then(val => {
}).catch(err => console.log('Array is empty now'));

function updateLastUserActivityTime(){
    return new Promise((resolve, reject) => {
        lastEditedInMilliSeconds = new Date().getTime();
        resolve();
    })
}

Promise.all([createPost({ title: 'Post Four', body: 'This is post Four'}), updateLastUserActivityTime()])
.then(val => console.log(posts, lastEditedInMilliSeconds));

deletePost()
.then(val => console.log(posts))
.catch(err => console.log('Array is empty now'))