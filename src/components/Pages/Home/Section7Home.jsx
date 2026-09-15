import { useState } from "react";
import "./section7home.css";
import { resolveToolImage } from "../../../data/toolsData";
import { loadTools } from "../../../utils/toolsStore";

export default function Section7Home() {

    const [tools] = useState(() => loadTools());

    return (
        <div id="tools" className='container section-spacing'>
            <div className="mainSection7Home">
                <span className='socialSubTitle'>What I work with</span>
                <h2>Tools I Use</h2>
                <div className="toolsGrid">
                    {tools.map((tool) => (
                        <div className="toolCard" key={tool.id}>
                            <span className="toolIconWrap">
                                <img src={resolveToolImage(tool)} alt={tool.label} />
                            </span>
                            <span className="toolLabel">{tool.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
