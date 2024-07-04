import React from 'react'
import { useSelector } from 'react-redux'
import CardProductComponent from '../components/CardProductComponent';
import {motion} from 'framer-motion'

function FavoritePage() {

    const {allFavorite} = useSelector(state => state.favoriteStore);

    console.log(allFavorite);


    // Framer animtion
	const fadeInAnimationVariants = {
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
    <div className='container mx-auto'>
        <h1 className='text-center my-[50px] text-mainBlue uppercase text-4xl'>Favorite Items</h1>

        <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView='animate'

        className='flex flex-wrap flex-col items-center lg:flex-row gap-[30px]'>
                {allFavorite.map((fav) => {
                            return (
                                <CardProductComponent
                                    key={fav.id}
                                    product={fav}
                                />
                            );
                        })}
        </motion.div>
    </div>
  )
}

export default FavoritePage