import "./scrollFollowLines.css";

export default function ScrollFollowLines() {
    return (
        <div className="scrollFollowRail" aria-hidden="true">
            <span className="scrollLine scrollLineUp"></span>
            <span className="scrollLine scrollLineDown"></span>
        </div>
    )
}
