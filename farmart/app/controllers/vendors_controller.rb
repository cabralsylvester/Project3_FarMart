class VendorsController < ApplicationController
  def index
    @vendors = Vendor.all.order(:created_at)
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @vendors}
    end
  end

  def show
    @vendor = Vendor.find(params[:id])

    respond_to do |format|
    format.html {render :show}
    format.json {render json: @vendor}
    end
  end

  def new
    @vendor = Vendor.new
  end

  def create
    @vendor = Vendor.new(Vendor_params)
    respond_to do |format|

      if @vendor.save
          format.html { redirect_to @vendor, notice: "Made the Grumbly" }
          format.json { render json: @vendor, status: :created, location: @vendor}
      else
        format.html {render :new }
        format.json { render json: @vendor.errors, status: :unprocessable_entity}
      end
    end
  end

  def edit
    @Vendor = Vendor.find(params[:id])
  end

  def update
    @Vendor = Vendor.find(params[:id])
    @Vendor.update(Vendor_params)
    redirect_to @Vendor
  end

  def destroy
    @Vendor = Vendor.find(params[:id])
    @Vendor.destroy
    redirect_to Vendors_path
  end

  private

  def Vendor_params
    params.require(:Vendor).permit(:authorName, :content, :title, :photoUrl)
  end
end
