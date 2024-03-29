class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy, :create_review, :upvote, :downvote]

  # GET /products
  # GET /products.json
  def index
    if params[:search]
      @products = Product.search(params[:search]).order("created_at DESC")
    else
      @products = Product.all.order('created_at DESC')
    end
    @product = Product.new
  end

  # GET /products/1
  # GET /products/1.json
  def show
    @products = Product.all
    @productsreview = Productsreviews.all
  end

  # GET /products/new
  def new
    @product = Product.new
  end

  # GET /products/1/edit
  def edit
  end

  # POST /products
  # POST /products.json
  def create
    @product = Product.new(product_params)
    respond_to do |format|
      if @product.save
        format.html { redirect_to @product, notice: 'Product was successfully created.' }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def create_review
    @review = Productsreviews.new
    @product = Product.find(params[:product_id])
    if @review.update_attribute(:title, params[:review][:title])
      if @review.update_attribute(:description, params[:review][:description])
        if @review.update_attribute(:product_id, @product.id)
          redirect_to :back, :notice => "Successfullly added review to Product"
        end
      end
    end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  def update
    respond_to do |format|
      if @product.update(product_params)
        format.html { redirect_to @product, notice: 'Product was successfully updated.' }
        format.json { render :show, status: :ok, location: @product }
      else
        format.html { render :edit }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url, notice: 'Product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def upvote
    @product = Product.find(params[:id])
    @product.liked_by current_user
    redirect_to @product
  end

  def downvote
    @product = Product.find(params[:id])
    @product.downvote_from current_user
    redirect_to @product
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      begin
        @product = Product.find(params[:id])
      rescue
        puts "I dont think this will work!"
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_params
      params.require(:product).permit(:name, :brand, :price, :description, :rating)
    end
end
