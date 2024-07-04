import React, { useEffect, useState } from 'react';
import ProductsService from '../services/productsService';

import { useDispatch, useSelector } from 'react-redux';
import { saveAllProductsAction } from '../store/productsSlice';
import CardProductComponent from '../components/CardProductComponent';

// icons
import { FaList } from 'react-icons/fa';
import { IoGridOutline } from 'react-icons/io5';

import {motion} from 'framer-motion'

function HomePage() {
	const [activeView, setActiveView] = useState('listView');

	const { allProducts, currentCategory } = useSelector(
		(state) => state.productStore
	);
	// TODO: add loader for products&categories
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentCategory === 'allProducts') {
			ProductsService.getAllProducts()
				.then((res) =>
					dispatch(saveAllProductsAction(res.data.products))
				)
				.catch((err) => console.log(err));
		} else {
			ProductsService.getAllProductsByCategory(currentCategory)
				.then((res) =>
					dispatch(saveAllProductsAction(res.data.products))
				)
				.catch((err) => console.log(err));
		}
	}, [currentCategory]);

	return (
		<main className='container mx-auto'>
			{/* grid/list view */}

			<div className='flex justify-end mt-[20px] mr-[20px] gap-[10px]'>
				<button
					onClick={() => setActiveView('listView')}
					className={
						activeView === 'listView' ? 'layoutView' : 'p-[5px]'
					}>
					{' '}
					<FaList size={30} />{' '}
				</button>
				<button
					onClick={() => setActiveView('gridView')}
					className={
						activeView === 'gridView' ? 'layoutView' : 'p-[5px]'
					}>
					{' '}
					<IoGridOutline size={30} />{' '}
				</button>
			</div>

			{/* Our products */}
			{/* wrapper div */}
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className={
					activeView === 'listView'
						? 'grid grid-cols-1 gap-[20px] mt-[20px]'
						: 'grid grid-cols-1 md:gird-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center gap-[20px] mt-[20px]'
				}>
				{allProducts.map((product) => {
					return (
						<CardProductComponent
							activeView={activeView}
							key={product.id}
							product={product}
						/>
					);
				})}
			</motion.div>
		</main>
	);
}

export default HomePage;
