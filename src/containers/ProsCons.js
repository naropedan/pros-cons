import {
    sortProsListWithDrag,
    sortConsListWithDrag,
    createProsItem,
    createConsItem,
    editProsTitle,
    editConsTitle
} from '../actions/action-creators/prosCons';
import {consListSelector, prosListSelector} from '../store/selectors';
import ProsConsList from '../components/ProsConsList';
import '../../assets/styles/pros-cons.css';
import Header from '../components/Header';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

class ProsCons extends React.Component {
    render() {
        const {
            prosList, consList, sortProsListWithDrag, sortConsListWithDrag,
            createProsItem, createConsItem, editProsTitle, editConsTitle
        } = this.props;

        return (
            <div className='container'>
                <div className='pros-cons-wrapper'>
                    <Header/>

                    <div className='pros-cons-content'>
                        <ProsConsList
                            sortItemWithDrag={sortProsListWithDrag}
                            createItem={createProsItem}
                            editTitle={editProsTitle}
                            items={prosList}
                            label='PROS'
                        />
                        <ProsConsList
                            sortItemWithDrag={sortConsListWithDrag}
                            createItem={createConsItem}
                            editTitle={editConsTitle}
                            items={consList}
                            label='CONS'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ProsCons.propTypes = {
    sortProsListWithDrag: PropTypes.func.isRequired,
    sortConsListWithDrag: PropTypes.func.isRequired,
    createProsItem: PropTypes.func.isRequired,
    createConsItem: PropTypes.func.isRequired,
    editProsTitle: PropTypes.func.isRequired,
    editConsTitle: PropTypes.func.isRequired,
    prosList: PropTypes.array.isRequired,
    consList: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    const prosList = prosListSelector(state);
    const consList = consListSelector(state);
    
    return {
        prosList,
        consList
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            sortProsListWithDrag,
            sortConsListWithDrag,
            createProsItem,
            createConsItem,
            editProsTitle,
            editConsTitle
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProsCons);