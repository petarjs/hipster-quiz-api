# Quiz API

The bare minimum API for apps created in my blog post [insert link here]().

You can use it at [http://hipster-quiz-api.petarslovic.com/](http://hipster-quiz-api.petarslovic.com/)

## Endpoints

### GET /

Returns 'Hello World'. :D

### GET /quizzes/search/:q

Searches the available quizes.

- q - Query string. It is matched against the quiz title, in a 'starts with' fashion.

### GET /quizzes/:id

Returns the details of a quiz.

- id - Id of the quiz we're interested in

### /questions/:id

Get the question details.

- id - Id of the question we want to see

### POST /questions/:id/answer

Check an answer to a question.  
Returns `{ "correct": Boolean }`

- id - Id of the question we're answering
- answer (body param) - Answer string we want to check if correct

## License

MIT