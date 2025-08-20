import './App.css';
import {SuggestControlExample1} from './example/SuggestControlExample1';
import {SuggestControlExample2} from './example/SuggestControlExample2';
import {TextControlExample1} from './example/TextControlExample1';
import {TextControlExample2} from './example/TextControlExample2';

function App() {
    return (
        <div>
            <div className="m w2">
                <TextControlExample1 />
            </div>
            <div className="m w3">
                <TextControlExample2 />
            </div>
            <div className="m w3">
                <SuggestControlExample1 />
            </div>
            <div className="m w3">
                <SuggestControlExample2 />
            </div>
        </div>
    );
}

export default App;
