class StaticPagesController < ApplicationController
  def home
    respond_to do |format|
      format.html
      format.any { head :not_acceptable }
    end
  end
end
