import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  {buyCourse}  from '../../../../services/operations/studentFeaturesAPI'

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart)

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    console.log("Bought these courses:", courses)
    // TODO: Integrate with payment gateway API
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="flex flex-col items-end gap-4 p-4 border-t border-gray-700 bg-gray-800">
      <div className="flex items-center gap-4 text-white">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-2xl font-bold">Rs {total}</p>
      </div>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses={`w-full justify-center ${cart.length === 0 ? 'bg-gray-600 cursor-not-allowed' : ''}`}
        disabled={cart.length === 0} // Disable button if the cart is empty
      />
    </div>
  )
}

export default RenderTotalAmount
