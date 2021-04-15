import { useDispatch, useSelector } from 'react-redux';
import { CategoryList } from '../../features/category/CategoryList';
import { NewRelease } from '../../features/newRelease/NewRelease';
import { fetchCategories, selectCategories } from '../../features/category/categorySlice';
import './HomePage.css';
import { useEffect } from 'react';

export function HomePage(props) {
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (<div className="HomePage">
                <NewRelease setCurrentUri={props.setCurrentUri}/>
                {categories.map(category => <CategoryList name={category.name} id={category.id} key={category.id} setPlaylistID={props.setPlaylistID}/>)}
                
            </div>);
}