import './styles/QueryTable.css'

const QueryTable = ({tests,setTests,getPosts,loading,setLoading}) => {

	const deletePost = async (test) => {
		setLoading(true);
		try {
			await fetch(`https://web-api-testing.onrender.com/api/testcases/${test._id}`, {
				method: 'DELETE'
			})
			setTests((prev) => prev.filter((t) => t !== test))
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}

	const postData = async (test) => {
		setLoading(true);
		try {
			await fetch(`https://web-api-testing.onrender.com/api/testcases/run/${test._id}`, {
				method: 'POST'
			})
			
			getPosts();
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="query-container">
			{loading && <div className="loader"></div>}
			<h1 className="query-table-title">Test Case Table</h1>
			<table className="query-table" border={1}>
				<thead className="query-table-header">
					<tr className="query-table-header-row">

						<th className="query-table-header-cell">S. no.</th>
						<th className="query-table-header-cell increase">Name</th>
						<th className="query-table-header-cell">Method</th>
						<th className="query-table-header-cell">URL</th>
						<th className="query-table-header-cell">Expected</th>
						<th className="query-table-header-cell">Last Run Result</th>
						<th className="query-table-header-cell">Action</th>
						<th className="query-table-header-cell"></th>
					</tr>
				</thead>
				<tbody className="query-table-body">
					{
						tests.map((test,index) => (
							<tr className="query-table-row" key={test._id}>
								<td className="query-table-cell">{index+1}</td>
								<td className="query-table-cell">{test.name}</td>
								<td className="query-table-cell">{test.method}</td>
								<td className="query-table-cell">{test.url}</td>
								<td className="query-table-cell">{test.expectedStatus}</td>
								<td className="query-table-cell">
									{test.lastRun && test.lastRun.message ? test.lastRun.message : "No message"}
								</td>
								<td className="query-table-cell">
									<button className="query-table-action-button" onClick={() => postData(test)}>Run</button>
								</td>
								<td className="query-table-cell">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon2" onClick={() => deletePost(test)}>
										<path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
									</svg>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

export default QueryTable