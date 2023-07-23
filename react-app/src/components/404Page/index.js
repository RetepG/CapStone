import BadPage from "../../assets/BadPage.png"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./badpage.css"

function BadPage404() {
    const history = useHistory()

    function goHome() {
        history.push('/')
    }

    return (
        <div className="bad-page-container">
            <div className="bad-page-info">
                <h1>404 Not Found!</h1>
                <h2 className="bad-page-text">Sorry! The page you were looking for doesn't exist</h2>
                <img src={BadPage} alt="badpage" className="bad-page-pic"></img>
                <button className="bad-page-button" onClick={() => goHome()}>Back to Home</button>
            </div>
        </div>
    )
}

export default BadPage404
