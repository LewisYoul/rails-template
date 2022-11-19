module ActivityServices
  class ActivityFilterer
    def initialize(activities, params)
      @activities = activities
      @params = params
    end

    def call
      @activities = @activities.where("name ILIKE ?", "%#{name}%") if name
      @activities = @activities.where(activity_type: activity_types) if activity_types.any?
      @activities = @activities.where("DATE_TRUNC('day', start_date) >= ?", start_date) if start_date
      @activities = @activities.where("DATE_TRUNC('day', start_date) <= ?", end_date) if end_date
      
      @activities
    end

    private

    def start_date
      @start_date ||= @params[:start_date].presence
    end

    def end_date
      @end_date ||= @params[:end_date].presence
    end

    def name
      @name ||= @params[:name] && !@params[:name].empty? ? @params[:name] : nil
    end

    def activity_types
      @activity_types ||= Array.wrap(@params[:activity_types]).compact.reject(&:blank?)
    end
  end
end