import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import ProsConsItem from './ProsConsItem';
import PropTypes from 'prop-types';
import * as React from 'react';

class ProsConsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedRowIndex: -1,
            newTitle: ""
        };
    }

    moveItem = (dragIndex, hoverIndex) => {
        const {sortItemWithDrag} = this.props;

        sortItemWithDrag({dragIndex, hoverIndex});
    }

    onRowSelect = (index) => {
        const {selectedRowIndex} = this.state;

        if (index !== selectedRowIndex) {
            this.setState({selectedRowIndex: index});
        }
    }

    onTextChange = (e, index) => {
        const {editTitle} = this.props;
        const title = e.target.value;

        editTitle({title, index});
    }

    createNewItem = (e) => {
        const {createItem} = this.props;
        const {newTitle} = this.state;

        if (newTitle) {
            this.setState({newTitle: ""});
            createItem({title: newTitle});
        }
        this.setState({selectedRowIndex: -1});
    }

    render() {
        const {label, items} = this.props;
        const {newTitle, selectedRowIndex} = this.state;
        const itemsCount = items.length;

        return (
            <div className='col-content'>
                <div className='col-header'>
                    <span>{label}</span>
                </div>
                <div className='list-data'>
                    {items.map((item, index) => (
                        <ProsConsItem
                            selectedRowIndex={selectedRowIndex}
                            onTextChange={this.onTextChange}
                            onRowSelect={this.onRowSelect}
                            moveItem={this.moveItem}
                            title={item.title}
                            key={item.id}
                            id={item.id}
                            index={index}
                        />
                    ))}
                    <React.Fragment>
                        <span>{itemsCount + 1}. </span>
                        <input
                            className={`${selectedRowIndex === itemsCount ? "" : "no-border"}`}
                            onChange={(e) => this.setState({newTitle: e.target.value})}
                            onFocus={(e) => this.onRowSelect(itemsCount)}
                            onBlur={(e) => this.createNewItem(e)}
                            value={newTitle}
                        />
                    </React.Fragment>
                </div>
            </div>
        );
    }
}

ProsConsList.propTypes = {
    sortItemWithDrag: PropTypes.func.isRequired,
    createItem: PropTypes.func.isRequired,
    editTitle: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

export default DragDropContext(HTML5Backend)(ProsConsList);
