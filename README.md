# JavaScript Basic Concepts

This file explains some basic JavaScript concepts in simple language.

---

## 1️⃣ Difference between var, let, and const

In JavaScript we use **var, let, and const** to declare variables, but they behave differently.

### var
- `var` was used in older JavaScript.
- It is **function scoped**, meaning it works inside a function.
- It can be **re-declared and re-assigned**.
- Because of this flexibility it can sometimes create bugs.

Example:
```javascript
var name = "Rahim";
var name = "Karim"; // allowed
```

### let
- `let` is introduced in ES6.
- It is **block scoped** (works inside `{ }`).
- It can be **re-assigned but not re-declared in the same scope**.

Example:
```javascript
let age = 20;
age = 21; // allowed
```

### const
- `const` is also block scoped.
- It **cannot be re-assigned** after declaration.
- Usually used for values that should not change.

Example:
```javascript
const country = "Bangladesh";
```

---

## 2️⃣ What is the spread operator (...)?

The **spread operator (`...`)** is used to expand elements from an array or object.

It helps copy or combine data easily.

Example with array:

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
```

Result:
```
[1, 2, 3, 4, 5]
```

Example with object:

```javascript
const user = { name: "Rahim", age: 20 };
const newUser = { ...user, country: "BD" };
```

---

## 3️⃣ Difference between map(), filter(), and forEach()

These are array methods used to loop through arrays.

### map()
- Creates a **new array**
- Transforms each element

Example:

```javascript
const numbers = [1,2,3];
const doubled = numbers.map(n => n * 2);
```

Result:
```
[2,4,6]
```

### filter()
- Creates a **new array**
- Returns elements that match a condition

Example:

```javascript
const numbers = [1,2,3,4];
const even = numbers.filter(n => n % 2 === 0);
```

Result:
```
[2,4]
```

### forEach()
- Used for looping
- **Does not return a new array**

Example:

```javascript
numbers.forEach(n => {
  console.log(n);
});
```

---

## 4️⃣ What is an arrow function?

An **arrow function** is a shorter way to write functions in JavaScript.

It uses the `=>` symbol.

Example:

Normal function:

```javascript
function add(a,b){
  return a + b;
}
```

Arrow function:

```javascript
const add = (a,b) => a + b;
```

Arrow functions make the code **shorter and cleaner**.

---

## 5️⃣ What are template literals?

Template literals are a modern way to write strings using **backticks (` `)**.

They allow embedding variables directly inside a string.

Example:

```javascript
const name = "Rahim";
const message = `Hello ${name}`;
```

Result:
```
Hello Rahim
```

They also support **multi-line strings** easily.

Example:

```javascript
const text = `
This is line one
This is line two
`;
```

---

✅ These JavaScript features help write cleaner, shorter, and more modern code.