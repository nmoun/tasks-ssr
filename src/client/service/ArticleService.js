import {JWT_TOKEN} from 'utils/constants'

export function fetchArticle(articleCode) {
  return fetch('/api/articles/' + articleCode, {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem(JWT_TOKEN),
    },
    credentials: 'same-origin'
  }).then((res) => {
    return res.json()
  }).catch(error => {
    console.log('error: ' + error)
  })
};

export function fetchArticleSuggest(searched) {
  return fetch('/api/articles/suggest/' + searched, {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem(JWT_TOKEN),
    },
    credentials: 'same-origin'
  }).then((res) => {
    return res.json()
  }).catch(error => {
    console.log('error: ' + error)
  })
};