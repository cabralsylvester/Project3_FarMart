class ProductsController < ApplicationController
  def index
    @vendor = Vendor.find(params[:vendor_id])
    @products = @vendor.products.order(:created_at)

    respond_to do |format|
      format.html { render :index}
      format.json {render json: @products }
    end
  end

  def show
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:id])
    @orders = @product.orders.all
    respond_to do |format|
      format.html { render :show}
      format.json { render json: @product, include: :orders}
    end
  end

  def new
    @vendor = Vendor.find(params[:vendor_id])
    @product = @vendor.products.new
  end

  def create
    @vendor = Vendor.find(params[:vendor_id])
    @product = @vendor.products.create!(product_params)

    respond_to do |format|
      if @product.save!
        format.html { redirect_to @vendor, notice: "Product was created." }
        format.json { render json: @product, status: :created }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity}
      end
    end

  end

  def edit
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:id])
  end

  def update
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:id])

    respond_to do |format|
      if @product.update!(product_params)
        format.html { redirect_to "/vendors/#{@vendor.id}/products/#{@product.id}", notice: "Product updated" }
        format.json { render json: @product, status: :updated }
      else
        format.html { render :new}
        format.json { render json: @product.errors, status: :unprocessable_entity}
      end
    end

  end

  def destroy
    @vendor = Vendor.find(params[:vendor_id])
    @product = Product.find(params[:id])
    @product.destroy
    redirect_to @vendor
  end
  #
  # def add_to_order
  #   @vendor = Vendor.find(params[:vendor_id])
  #   @product = Product.find(params[:id])
  #   @consumer = Consumer.find(params[:consumer_id])
  #   @product.orders.create(order_params)
  # end
  #
  # def delete_from_order
  #   @vendor = Vendor.find(params[:vendor_id])
  #   @product = Product.find(params[:id])
  #   @product.orders.find_by(product_id: params[:id] ).destroy
  # end

  private

  def product_params
    params.require(:product).permit(:category, :name, :amount, :unit_of_measure, :image, :description)
  end

  def order_params
    params.require(:order).permit(:purchasee_name, :datetime, :name, :amount_in_cart, :unit_of_measure)
  end
end
