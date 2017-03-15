class OrdersController < ApplicationController


  def index
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:product_id])
    @orders = @product.orders.order(:created_at)

    respond_to do |format|
      format.html { render :index}
      format.json {render json: @orders }
    end
  end

  def show
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:product_id])
    @order = Order.find(params[:id])
    respond_to do |format|
      format.html { render :show}
      format.json { render json: @order}
    end
  end

  def new
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:product_id])
    @order = @product.orders.new
  end

  def create
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:product_id])
    @order = @product.orders.create!(order_params)

    respond_to do |format|
      if @order.save!
        format.html { redirect_to "/vendors/#{@vendor.id}/products/#{@product.id}", notice: "Order was created." }
        format.json { render json: @order, status: :created }
      else
        format.html { render :new }
        format.json { render json: @order.errors, status: :unprocessable_entity}
      end
    end

  end

  def edit
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:product_id])
    @order = Order.find(params[:id])
  end

  def update
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:product_id])
    @order = Order.find(params[:id])

    respond_to do |format|
      if @order.update!(order_params)
        format.html { redirect_to "/vendors/#{@vendor.id}/products/#{@product.id}"}
        format.json { render json: @order, include: :orders }
      else
        format.html { render :new}
        format.json { render json: @order.errors, status: :unprocessable_entity}
      end
    end

  end

  def destroy
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:product_id])
    @order = Order.find(params[:id])
    @order.destroy
    redirect_to "/vendors/#{@vendor.id}/products/#{@product.id}"
  end

  def add_to_order
    @product = Product.find(params[:product_id])
    @order = Order.find(params[:id])
    @order.products.create(product_params)
  end

  def delete_from_order
    @product = Product.find(params[:product_id])
    @order = Order.find(params[:id])
    @order.products.find_by(product_id: params[:id] ).destroy
  end

  private

  def order_params
    params.require(:order).permit(:customer_name, :contact_num, :pick_up_time, :reserve_amount)
  end

  def product_params
    params.require(:product).permit(:category, :name, :amount, :unit_of_measure, :image, :description, :vendor_id)
  end
end
