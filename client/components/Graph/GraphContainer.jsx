import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie,
VictoryTheme, VictoryLabel, VictoryLine, VictoryLegend, VictoryStack } from 'victory';
import moment from 'moment';

//import application 
import Graph from './Graph.jsx';

const data1 = [
  {language: 'Python', commits: 167},
  {language: 'Javascript', commits: 1992},
  {language: 'C++', commits: 506},
  {language: 'Java', commits: 239}
];

const timeOne = [
  {date: new Date('2017-01-17'), commits: 240 },
  {date: new Date('2017-03-17'), commits: 192 },
  {date: new Date('2017-05-17'), commits: 20 },
  {date: new Date('2017-07-17'), commits: 288 },
  {date: new Date('2017-09-17'), commits: 672 },
  {date: new Date('2017-11-17'), commits: 118 }
];

const timeTwo = [
  {date: new Date('2017-01-17'), commits: 900 },
  {date: new Date('2017-03-17'), commits: 800 },
  {date: new Date('2017-05-17'), commits: 759 },
  {date: new Date('2017-07-17'), commits: 200 },
  {date: new Date('2017-09-17'), commits: 0 },
  {date: new Date('2017-11-17'), commits: 129 }
];

const additions = [
  {repository: "Pete's Memory Palace", additions: 857},
  {repository: "Peer Connect", additions: 99},
  {repository: "Pastchat", additions: 2599},
  {repository: "Personal Website", additions: 192},
  {repository: "Webtorrent", additions: 1604}
]

const deletions = [
  {repository: "Pete's Memory Palace", deletions: 502},
  {repository: "Peer Connect", deletions: 89},
  {repository: "Pastchat", deletions: 2028},
  {repository: "Personal Website", deletions: 102},
  {repository: "Webtorrent", deletions: 1144}
]


class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { bar: true }
    this.barPieButton = this.barPieButton.bind(this);
  }

  barPieButton() {
    let opposite = !this.state.bar;
    this.setState({ bar: opposite });
  }

  barToPie() {
    if (this.state.bar) {
      return (
        <VictoryChart className="graph" 
          animate={{ duration: 1000, easing: "bounce" }}
          theme={VictoryTheme.material} 
          domainPadding={20}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>
          <VictoryLabel x={0} y={29}
            text="Commits over Languages"
          />
          <VictoryAxis
            tickFormat={["Python", "Javascript", "C++", "Java"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}\nCommits`)}
          />
          <VictoryBar
            data={data1}
            x="language"
            y="commits"
          />
        </VictoryChart>
      )
    } else {
      return (
        <div className="VictoryContainer graph">
          <VictoryPie
            padding={{ left: 80, top: 50, right: 60, bottom: 50 }}
            animate={{ duration: 1000, easing: "bounce"}}
            data={data1}
            style={{ labels: { fontSize: 8}}}
            labels={(data) => `${data.language}\nCommits: ${data.commits}`}
            x="language"
            y="commits"
          />
          </div>
      )
    }
  }

  render() {
    return (
      <div id="graphContainer" className="section padding">
        <div className="graphContainers">
          <button onClick={this.barPieButton}>click me</button>
          {this.barToPie()}
          <p>Oh boy person you really really did write alot.</p>
        </div>

        <div className="graphContainers">
        <VictoryChart className="graph" 
          animate={{ duration: 1000, easing: "poly" }}
          theme={VictoryTheme.material}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>          
          <VictoryLabel x={0} y={29}
            text="Language Commits over time"
          />
          <VictoryLegend x={155} y={50}
            title="Legend"
            centerTitle
            orientation="horizontal"
            gutter={10}
            style={{ border: { stroke: "black" }, title: {fontSize: 12 } }}
            data={[
              { name: "Javascript", symbol: { fill: "red" } },
              { name: "Python", symbol: { fill: "blue" } }
            ]}
          />
          <VictoryAxis scale="time" />
          <VictoryAxis dependentAxis tickFormat={(x) => (`${x}\nCommits`)}/>
          <VictoryLine
            style={{ data: { stroke: "blue"} }}
            data={timeOne}
            x="date"
            y="commits"
          />
          <VictoryLine
            style={{ data: { stroke: "red"} }}
            data={timeTwo}
            x="date"
            y="commits"
          />
          </VictoryChart>
          <p>
            Wow you worked with that many languages? You really are a cool bean. 
            Here you deserve a sticker form the sticker drawer for all your cool work.
          </p>
        </div>


        <div className="graphContainers">
        <VictoryChart className="graph" 
          // theme={VictoryTheme.material} 
          domainPadding={{ x: 15 }}
          padding={{ left: 50, top: 50, right: 20, bottom: 50 }}>
          <VictoryLabel x={0} y={29}
            text="Additions/Deletions on repos"
          />
          <VictoryAxis
            style={{ tickLabels: { angle: -50 } }}
            tickFormat={["Pete's Memory Palace", "Peer Connect", "Pastchat", "Personal Website", "Webtorrent"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}\nLines`)}
          />
          <VictoryStack>
          <VictoryBar
            barRatio={0.5}
            data={additions}
            x="Repository"
            y="additions"
          />
          <VictoryBar
            barRatio={0.5}
            data={deletions}
            x="Repository"
            y="deletions"
          />
          </VictoryStack>
        </VictoryChart>
        <p>
          You sure had alot of repos under your belt. Wow so many deletions... AND ADDITIONS!
          I'm surprised you love coding that much after so much line deletions and additions.
          Sounds like insanity to me.
        </p>
        </div>

        <div className="graphContainers">

        <VictoryChart className="graph" 
          theme={VictoryTheme.material} 
          domainPadding={20}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>
          <VictoryAxis
            tickFormat={["Python", "Javascript", "C++", "Java"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}\nCommits`)}
          />
          <VictoryBar
            data={data1}
            x="language"
            y="commits"
          />
        </VictoryChart>
        
        </div>

        {/* <Graph />
        <Graph />
        <Graph /> */}
      </div>
    )
  }
}

export default GraphContainer;