module ActivityServices
  class ActivityFilterer
    def initialize(activities, params)
      @activities = activities
      @params = params
    end

    def call
      @activities = @activities.where("name ILIKE ?", "%#{name_param}%") if name_param
      
      @activities
    end

    private

    def name_param
      @name ||= @params[:name] && !@params[:name].empty? ? @params[:name] : nil
    end
  end
end