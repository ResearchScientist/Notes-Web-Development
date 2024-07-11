# POST method

```javascript
async function postData(url = "",data = {}) {
  const response = await fetch(url,{
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

postData("https: // somesite . com / item",{ item: 10})
.then((data) => {
  console.log(data);
});
```

# Upload JSON Data

```javascript
async function postJSON(data) {
  try {
    const response = await fetch("some url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("success",result);
  }
  catch (error) {
    console.log("error",error);
  }
}

const data = { username: "someName" };
postJSON(data);
```

# Upload a File

```javascript
async function upload(formData) {
  try {
    const response = await fetch("some url", {
      method: "PUT",
      body: formData,
    });
    const result = await response.json();
    console.log("success",result);
  }
  catch (error) {
    console.log("error",error);
  }
}

const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append("username","someName");
formData.append("avatar",fileField.files[0]);

upload(formData);
```

