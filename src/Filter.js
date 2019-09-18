import React from 'react';
import FilterResults from 'react-filter-search';
import './Filter.css';
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: ''
        };
    }
    componentWillMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                for (let i = 0; i < 10; i++) {

                    if (i % 2 == 0) {
                        let men = `https://randomuser.me/api/portraits/med/men/${i}.jpg`
                        json[i].photo = men;
                    } else {
                        let women = `https://randomuser.me/api/portraits/med/women/${i}.jpg`
                        json[i].photo = women;
                    }


                }


                this.setState({ data: json });
                console.log(json)
            });
    }
    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };
    render() {
        const { data, value } = this.state;
        return (
            <div id="container">
                <div id="searchbar">
                    <h2>Artisty Directory</h2>
                    <input type="text" value={value} onChange={this.handleChange} />
                </div>

                <FilterResults
                    value={value}
                    data={data}
                    renderResults={results => (
                        <div>
                            {results.map(el => (
                                <div class='card'>
                                    <div class="picture">
                                        <img src={el.photo} />
                                    </div>
                                    <div class="nameSection">
                                        <span>{el.name}</span>
                                        <span>{el.company.name}</span>
                                    </div>


                                </div>
                            ))}
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default Filter;