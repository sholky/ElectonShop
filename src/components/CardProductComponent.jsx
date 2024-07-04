import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveInCartAction } from '../store/cartSlice';


import {motion} from 'framer-motion'

function CardProductComponent({ product, activeView }) {
	// console.log(product)

	const dispatch = useDispatch();

	function handleAddToCart() {
		dispatch(saveInCartAction(product));
	}
	return (
		<motion.div
		whileHover={{scale: 1.05}}
		whileTap={{scale: 1.1}}
			className={
				activeView === 'listView'
					? 'w-full flex items-center justify-between border-mainBlue border-b pb-[15px]'
					: 'w-[300px] h-full border border-mainBlue rounded-lg flex flex-col items-center gap-[15px] cursor-pointer'
			}>
			{/* product.image ? img sa slikom : img neka dummySlika */}
			<div
				className={
					activeView === 'listView'
						? 'relative w-[100px] h-[100px]'
						: 'relative w-full'
				}>
				<img
					src={product.thumbnail}
					alt={product.title}
					className={
						activeView === 'listView'
							? 'w-[100px] h-[100px] object-cover'
							: 'w-full h-[200px] object-cover'
					}
				/>
				{/* overlay */}
				<div className='absolute inset-0 bg-[#000] opacity-60 rounded-t-lg hover:opacity-0 transition-all duration-300 cursor-pointer' />
			</div>

			<h2 className='font-extrabold text-xl text-mainBlue'>
				{product.title}
			</h2>
			<span className='text-mainYellow'>${product.price}</span>

			{/* rating === zvezdice */}
			<div className='hidden lg:block'>
				<Rating
					name='half-rating'
					defaultValue={product.rating}
					precision={0.5}
					readOnly
				/>
			</div>

			<div className='py-[20px] flex gap-[10px] items-center justify-center'>
				<Link
					to={`/singleProduct/${product.id}`}
					className='bg-mainBlue px-[16px] py-[8px] text-whiteTextColor mb-[10px] rounded-lg hover:bg-mainYellow transition-all duration-200'>
					View Detail
				</Link>

				<Link
					to='/cart'
					className='bg-mainYellow text-whiteTextColor px-[16px] py-[8px] rounded-xl shadow-lg'
					onClick={handleAddToCart}>
					Add To Cart
				</Link>
			</div>
		</motion.div>
	);
}

export default CardProductComponent;
