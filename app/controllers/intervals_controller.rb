class IntervalsController < ApplicationController
    before_filter :authenticate_user!
    before_filter :require_nda
    before_filter :find_interval, :only => [:show, :update, :edit]
    
	def index
    @filters = Interval.filters
    @intervals = Interval.search(params)
    render 'index'
  end

  def show
    @tags = Tag.all()
    @applied_tags= @interval.taggings

    @phenomenon = Coding.phenomenon
    @applied_phenomenon = @interval.codings.phenomenon
    @people = @interval.codings.people

    render "show"
  end

  def new
    @interval = Interval.new
    render "new"
  end

  def edit
    render "edit"
  end


  def create
    @interval = Interval.new(params[:interval])
    if @interval.save
      redirect_to(@interval, :notice => 'Interval was successfully created.')
    else
      render :action => "new"
    end
  end

  def update
    @interval.attributes = {'tag_ids' => []}.merge(params[:interval] || {})
    
    if @interval.update_attributes(params[:interval])
      redirect_to(@interval, :notice => 'Interval was successfully updated.')
    else
      render :action => "edit"
    end
  end

  def destroy
    @interval = Interval.find(params[:id])
    @interval.destroy
    redirect_to(intervals_url)
  end

  private
  def find_interval
    @interval = Interval.find(params[:id])
  end
end
