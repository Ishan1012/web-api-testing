import './styles/Content.css'

const QueryForm = ({getPosts, setLoading}) => {

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    if (form.name.value === '' || form.method.value === 'method' || form.url.value === '') {
      setLoading(false);
      alert("Please fill out all the required fields correctly.");
    }
    else {
      const data = {
        name: form.name.value,
        method: form.method.value,
        url: form.url.value,
        expectedStatus: form.code.value,
        expectedBody: form.key.value
      }

      try {
        await fetch('https://web-api-testing.onrender.com/api/testcases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        getPosts();
        form.reset();
      } catch (err) {
        console.log("Error: ", err);
      }
      finally {
        setLoading(false);
      }
    }

  }

  return (

    <div className="query-container">
      <h1>Add Test Case</h1>
      <form onSubmit={postData}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <div className="inner-container">
          <div className="left-container">
            <div className="method-container">
              <label htmlFor="method" id='methodName'>Method</label>
              <select name="method" id="method">
                <option value="method">Method</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
            </div>
            <div className="code-container">
              <label htmlFor="code" id='statusCode'>Status Code</label>
              <select name="code" id="code">
                <option value="200">200</option>
                <option value="201">201</option>
                <option value="204">204</option>
                <option value="400">400</option>
                <option value="401">401</option>
                <option value="403">403</option>
                <option value="404">404</option>
                <option value="500">500</option>
              </select>
            </div>
          </div>
          <div className="right-container">
            <label htmlFor="url">URL</label>
            <input type="url" name="url" id="url" />
            <label htmlFor="key">Expected JSON Key</label>
            <input type="text" name="key" id="key" placeholder='Value' />
          </div>
        </div>
        <div className="save-container">
          <input type="submit" value="Save" id='save' />
        </div>
      </form>
    </div>
  )
}

export default QueryForm