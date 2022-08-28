module ActivityServices
  class ActivityFilterer
    def initialize(activities, params)
      @activities = activities
      @params = params
    end

    def call
      @activities = @activities.where("name ILIKE ?", "%#{name_param}%") if name_param
      @activities = @activities.where(activity_type: activity_types) if activity_types.any?
      
      @activities
    end

    private

    def name_param
      @name ||= @params[:name] && !@params[:name].empty? ? @params[:name] : nil
    end

    def activity_types
      @activity_types ||= @params[:activity_types] || []
    end
  end
end