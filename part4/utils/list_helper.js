const dummy = (_blogs) => 1
const totalLikes = blogs => blogs.reduce((t,b) => t + b.likes,0)
const favoriteBlog = blogs => blogs.length ? blogs.reduce((fv,b) => b.likes > fv.likes ? b : fv,blogs[0]) : {}

//Bunch of one liners (function programing style) just for fun, instead of using low dash.
const id = x => x
const split =  (f,g) => x => [f(x),g(x)]
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x); 
const toObject = k => ([obj,bk]) => ({ author : bk , [k] : obj[bk] })
const biggestKey = b => Object.keys(b).reduce((t,c) => b[c] > b[t] ? c : t)
const groupBy = k => l => l.reduce((t,b) => ({...t, [b.author] : b[k] + (t[b.author] || 0) }) ,{})
const blogsPerAuthor = blogs => blogs.reduce((t,b) => ({...t, [b.author] : 1 + (t[b.author] || 0)}), {})

const mostBlogs = blogs => blogs.length ? compose(toObject("blogs"),split(id,biggestKey),blogsPerAuthor)(blogs) :  {}
const mostLikes = blogs => blogs.length ? compose(toObject("likes"),split(id,biggestKey),groupBy('likes'))(blogs) : {}

module.exports = { dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes }