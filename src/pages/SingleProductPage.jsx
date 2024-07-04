import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductsService from '../services/productsService';
import LoaderComponent from '../components/LoaderComponent';
import { Rating } from '@mui/material';

// icons
import { CiHeart } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { saveInCartAction } from '../store/cartSlice';
import { saveFavoriteAction } from '../store/favoriteSlice';
import {motion} from 'framer-motion'

function SingleProductPage() {
	const [singleProduct, setSingleProduct] = useState({});
	const [currentImage, setCurrentImage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [favoriteIdIcon, setFavoriteIdIcon] = useState(null);

	const { allFavorite } = useSelector((state) => state.favoriteStore);

	// dispatch
	const dispatch = useDispatch();

	// 1. uzmi ID
	const { productId } = useParams();

	useEffect(() => {
		// 2. Poslati Request... SERVICE
		ProductsService.getSingleProduct(productId)
			.then((res) => {
				setSingleProduct(res.data);
				setIsLoading(true);
			})
			.catch((err) => console.log(err));
	}, []);

	function handleCurrentImage(index) {
		setCurrentImage(index);
	}

	// handleAddToCart
	function handleAddToCart() {
		dispatch(saveInCartAction(singleProduct));
	}

	// handleAddToFavorite
	function handleAddFavorite() {
		dispatch(saveFavoriteAction(singleProduct));
	}

	useEffect(() => {
		allFavorite.find((item) => {
			if (item.id === parseInt(productId)) {
				setFavoriteIdIcon(item.id);
				return;
			}
		});
	}, [allFavorite]);


	    // Framer animtion
		const fadeInAnimationVariantsLeft = {
			initial: {
				opacity: 0,
				x: -100,
			},
			animate: {
				opacity: 1,
				x: 0,
				transition: {
					delay: 0.1,
					duration: 0.5,
				},
			},
		};

		    // Framer animtion
			const fadeInAnimationVariantsRight = {
				initial: {
					opacity: 0,
					x: 100,
				},
				animate: {
					opacity: 1,
					x: 0,
					transition: {
						delay: 0.1,
						duration: 0.5,
					},
				},
			};

	

	return (
		<div className='px-[10px] my-[20px]'>
			{isLoading ? (
				<div className='container mx-auto mt-[50px] flex items-start gap-[20px] flex-col md:flex-row'>
					{/* left side */}
					<motion.div
					      variants={fadeInAnimationVariantsLeft}
						  initial="initial"
						  whileInView='animate'
					className='w-full md:w-[50%]'>
						<img
							src={singleProduct.images[currentImage]}
							alt=''
							className=' h-[400px]'
						/>
						<div className='flex items-center gap-[20px] flex-wrap'>
							{singleProduct.images.map((imgSrc, index) => {
								return (
									<img
										src={imgSrc}
										alt=''
										key={index}
										className='w-[100px] h-[100px] object-cover border-2 border-mainBlue rounded-xl mt-[20px]'
										onClick={() => handleCurrentImage(index)}
									/>
								);
							})}
						</div>
					</motion.div>
					{/* right side */}
					<motion.div
					      variants={fadeInAnimationVariantsRight}
						  initial="initial"
						  whileInView='animate' className='flex flex-col gap-[10px]'>
						<h2 className='font-extrabold text-2xl text-mainBlue mb-[10px]'>
							{singleProduct.title}
						</h2>
						<span className='text-blueTextColor text-[20px]'>
							${singleProduct.price}
						</span>
						<p className='flex-center gap-[10px]'>
							<span className='text-blackTextColor text-[20px]'>
								Reviews:
							</span>
							<Rating
								name='half-rating'
								defaultValue={singleProduct.rating}
								precision={0.5}
								readOnly
							/>
						</p>
						<p className='flex-center gap-[10px] text-[20px] text-blackTextColor'>
							Availibilty:
							{singleProduct.stock ? (
								<span className='flex-center gap-[5px] text-lightGreen'>
									{' '}
									<FaCheck /> In Stock
								</span>
							) : (
								<span className='flex-center gap-[5px] text-mainRed'>
									<RxCross2 size={24} /> Out Of Stock
								</span>
							)}
						</p>
						<p className='text-[20px] text-blackTextColor'>
							Hurry up! only{' '}
							<span className='font-bold'>{singleProduct.stock}</span>{' '}
							product left in stock!
						</p>
						<p className='text-[20px] text-blackTextColor'>
							Total price:{' '}
							<span className='text-blueTextColor text-[20px]'>
								${singleProduct.price}
							</span>
						</p>

						{/* ADD / Favorite Button */}
						<div className='flex items-center mt-[50px] gap-[20px]'>
							<Link
								to='/cart'
								className='bg-mainYellow text-whiteTextColor px-[24px] py-[12px] rounded-xl shadow-lg text-[20px]'
								onClick={handleAddToCart}>
								Add To Cart
							</Link>

							<Link
								to='/favorite'
								className='bg-lightBlue px-[24px] py-[12px] rounded-xl shadow-lg border border-blackTextColor '
								onClick={handleAddFavorite}>

								{favoriteIdIcon === parseInt(productId) ? (
									<CiHeart size={28} color='red' />
								) : (
									<CiHeart size={28} />
								)}

							</Link>
						</div>
					</motion.div>
				</div>
			) : (
				<div className='flex'>
					<LoaderComponent />
				</div>
			)}
		</div>
	);
}

export default SingleProductPage;
