import axios from "axios";
import React, { useCallback, useState } from "react";
import "./App.css";
import Button from "./component/Button";

const ShowAxiosResponse = React.lazy(() =>
  import("./component/ShowAxiosResponse")
);


// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  console.log({ config })
  return config
})


//  Global header
axios.defaults.headers.common['X-AUTH'] = `AAAAAAAAAAAAABBBBBBBBBBBBCCCCCCCCCCCCCCCCCDDDDDDDDDDDDEEEEEEEEFFFFFFF`

//  AXIOS INSTANCE
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

axiosInstance.get('/comments').then(res => console.log({ res }))

function App() {
  const [axiosResponse, setAxiosResponse] = useState();

  const handleGetRequest = useCallback(async () => {
    try {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=5`
      );
      console.log(result.status);
      setAxiosResponse(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleGetWithTimeOutRequest = useCallback(async () => {
    try {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=5`,
        { timeout: 5 }
      );
      console.log(result.status);
      setAxiosResponse(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePostRequest = useCallback(async () => {
    try {
      const result = await axios.post(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          title: "axios post request",
          completed: true,
        }
      );

      setAxiosResponse(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePutAndPatchRequest = useCallback(async () => {
    try {
      const result = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/1`,
        {
          title: "axios put request",
          completed: true,
        }
      );

      setAxiosResponse(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteRequest = useCallback(async () => {
    try {
      const result = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/1`
      );

      setAxiosResponse(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSimultaneousRequests = useCallback(async () => {
    try {
      const result = await axios.all([
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
      ]);

      setAxiosResponse(result);
    } catch (error) {
      console.log(error);
    }
  }, []);


  // Custom header
  const handleCustomHeader = useCallback(async () => {

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: "something something",
        'Custom-key': "Custom-Value"
      }
    }

    try {
      const result = await axios.post(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          title: "axios post request",
          completed: true,
        }, config
      );

      setAxiosResponse(result);
    } catch (error) {
      console.log(error);
    }

  }, [])

  const handleTransform = useCallback(async () => {

    const options = {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/todos",
      data: {
        title: "hello world"
      },
      transformResponse: axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data
      })
    }

    try {
      const result = await axios(options)
      setAxiosResponse(result);
    } catch (error) {
      console.log(error)
    }
  }, [])


  const handleErrorHandling = useCallback(async () => {

    try {
      const result = await axios.get(`https://jsonplaceholder.typicode.com/todoss`, {
        // validateStatus: (res) => {
        //   return res < 500
        // }
      })
      ShowAxiosResponse(result)
    } catch (error) {
      if (error.response) {
        //  Server responded with a status other than 200 range
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        if (error.response.status === 404) {
          alert(`Error: Page Not Found`)
        }
      } else if (error.request) {
        //  Request was made but no response
        console.log({ errorRequest: error.request })
      } else {
        console.log({ errorMessage: error.errorMessage })
      }
    }

  }, [])


  const handleCancelRequest = useCallback(async () => {
    const controller = new AbortController();

    axios.get('https://jsonplaceholder.typicode.com/todos/3', {
      signal: controller.signal
    }).then(function (response) {
      setAxiosResponse(response);
    });
    // cancel the request
    controller.abort('cancelled !!@!')

  }, [])


  return (
    <div className="m-5">
      <div className="d-flex justify-content-between">
        <Button
          onButtonClick={handleGetRequest}
          text="GET"
          variant="red"
          size="small"
        />
        <Button
          onButtonClick={handleGetWithTimeOutRequest}
          text="GET With Timeout [Check Console] "
          variant="blue"
          size="small"
        />
        <Button
          onButtonClick={handlePostRequest}
          text="POST"
          variant="grey"
          size="small"
        />
        <Button
          onButtonClick={handlePutAndPatchRequest}
          text="PUT/PATCH"
          variant="yellow"
          size="small"
        />
        <Button
          onButtonClick={handleDeleteRequest}
          text="DELETE"
          variant="dark"
          size="small"
        />
        <Button
          onButtonClick={handleSimultaneousRequests}
          text="Simultaneous Requests"
          variant="green"
          size="small"
        />
        <Button onButtonClick={handleCustomHeader} text="Custome Header" variant="dark-blue" size="small" />
        <Button onButtonClick={handleTransform} text="Transform" variant="yellow" size="small" />
        <Button onButtonClick={handleErrorHandling} text="Error Handling" variant="red" size="small" />
        <Button onButtonClick={handleCancelRequest} text="Cancel Request [Check Console]" variant="green" size="small" />
      </div>
      <React.Suspense fallback={"Loading...."}>
        {axiosResponse?.length && axiosResponse?.length > 0
          ? axiosResponse.map((axiosResponse) => (
            <>
              <div className="mt-5 bg-dark text-primary">
                {axiosResponse && (
                  <ShowAxiosResponse axiosResponse={axiosResponse} />
                )}
              </div>
            </>
          ))
          : <div className="mt-5 bg-dark text-primary">
            {axiosResponse && (
              <ShowAxiosResponse axiosResponse={axiosResponse} />
            )}
          </div>}
      </React.Suspense>
    </div>
  );
}

export default App;
