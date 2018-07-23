import {DragSource, DropTarget} from 'react-dnd';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import flow from 'lodash/flow';
import * as React from 'react';

const itemSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    },
};

const itemTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        const element = ReactDOM.findDOMNode(component);
        const hoverBoundingRect = element.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (
            (dragIndex < hoverIndex && hoverClientY < hoverMiddleY )
            || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
        ) {
            return;
        }

        props.moveItem(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    }
};

class ProsConsItem extends React.Component {
    render() {
        const {
            connectDropTarget,
            connectDragSource,
            selectedRowIndex,
            onTextChange,
            onRowSelect,
            title,
            index
        } = this.props;

        return (
            <React.Fragment>
                <span>{index + 1}. </span>
                {connectDragSource(
                    connectDropTarget(
                        <input
                            className={`${selectedRowIndex === index ? "" : "no-border"}`}
                            onChange={(e) => onTextChange(e, index)}
                            onFocus={() => onRowSelect(index)}
                            onBlur={() => onRowSelect(-1)}
                            value={title}
                        />
                    )
                )}
            </React.Fragment>
        );
    }
}

ProsConsItem.propTypes = {
    selectedRowIndex: PropTypes.number.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onRowSelect: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};

export default flow(
    DragSource(
        'prosConsItem',
        itemSource,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        }),
    ),
    DropTarget(
        'prosConsItem',
        itemTarget,
        (connect) => ({
            connectDropTarget: connect.dropTarget()
        }))
)(ProsConsItem);