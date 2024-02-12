## This is basic example how to implement AI (without functions)

### For example with functions see [guide](https://www.youtube.com/watch?v=WpQ0TqS3_68)

### Or just use code this boilerplate

```ts
if (data.promt === "") return
// 1. Get response is user want to use some function or just chat
const response: TAPIOpenAIResponse = await axios.post("/api/openai", { promt: data.promt } as TAPIOpenAI)
// 2.1 If user want to use function handle each function
if (response.data.choices[0].message.function_call?.name) {
  switch (response.data.choices[0].message.function_call?.name) {
    case "editFoodQuantity":
      await editFoodQuantity(
        JSON.parse(response.data.choices[0].message.function_call.arguments).foodTitle,
        JSON.parse(response.data.choices[0].message.function_call.arguments).foodAmount,
        JSON.parse(response.data.choices[0].message.function_call.arguments).action,
      )
      break
    case "addRandomFood":
      await addRandomFood(
        JSON.parse(response.data.choices[0].message.function_call.arguments).foodAmount ?? 1,
        data.promt,
      )
      break
    case "getFood":
      await getFood(data.promt)
      break
    case "logout":
      logoutUser()
      break
    case "clearCart":
      clearCart()
      break
    case "goTo":
      goTo(JSON.parse(response.data.choices[0].message.function_call.arguments).route ?? null)
      break
    default:
      break
  }
}
// 2.2 Otherwise return text response
else {
  toast.show(
    "success",
    "ChatGPT4 response",
    response.data.choices[0].message.content,
    response.data.choices[0].message.content!.length * 100,
  )
}
```
