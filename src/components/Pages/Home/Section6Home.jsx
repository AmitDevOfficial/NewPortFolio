import React from 'react';
import "./section6home.css";
import Progress from './Progress';


export default function Section6Home() {
    

    return (
        <div id="section6Home" className='container'>
            <div className="mainSection6Home">
                <div className="mainSection5homeHeading">
                    <span className='socialSubTitle'>Here is a sample of projects I've worked on.</span>
                    <h1>Selected Projects</h1>
                </div>

                <div className="mainProgressCard">
                <div className="progressCards">
                        <span className='socialSubTitle'>Skillset Three</span>
                        <h3>UI DESIGN</h3>
                        <Progress value="80" content="main"  />
                        <Progress value="10" content="main"  />
                        <Progress value="90" content="main"  />
                        <Progress value="50" content="main"  />
                        <Progress value="70" content="main"  />
                    </div>
                    <div className="progressCards">
                        <span className='socialSubTitle'>Skillset Three</span>
                        <h3>UI DESIGN</h3>
                        <Progress value="80" content="main"  />
                        <Progress value="10" content="main"  />
                        <Progress value="90" content="main"  />
                        <Progress value="50" content="main"  />
                        <Progress value="70" content="main"  />
                    </div>
                    <div className="progressCards">
                        <span className='socialSubTitle'>Skillset Three</span>
                        <h3>UI DESIGN</h3>
                        <Progress value="80" content="main"  />
                        <Progress value="10" content="main"  />
                        <Progress value="90" content="main"  />
                        <Progress value="50" content="main"  />
                        <Progress value="70" content="main"  />
                    </div>
                </div>
            </div>
        </div>
    );
}
