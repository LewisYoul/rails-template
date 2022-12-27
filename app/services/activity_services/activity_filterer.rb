module ActivityServices
  class ActivityFilterer
    DEFAULT_PAGE = 1
    DEFAULT_PER_PAGE = 30

    def initialize(activities, params)
      @activities = activities
      @params = params
    end

    def call
      @activities = @activities.where("name ILIKE ?", "%#{name}%") if name
      @activities = @activities.where(activity_type: activity_types) if activity_types.any?
      @activities = @activities.where("DATE_TRUNC('day', start_date) >= ?", start_date) if start_date
      @activities = @activities.where("DATE_TRUNC('day', start_date) <= ?", end_date) if end_date
      
      Result.new(@activities.offset(offset).limit(per_page), @activities.count, page, per_page)
    end

    private

    def offset
      (page - 1) * per_page
    end

    def page
      @page ||= @params[:page].to_i.positive? ? @params[:page].to_i : DEFAULT_PAGE
    end

    def per_page
      @per_page ||= @params[:per_page].to_i.positive? ? @params[:per_page].to_i : DEFAULT_PER_PAGE
    end

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

    class Result
      attr_reader :activities, :total_count, :per_page

      def initialize(activities, total_count, page, per_page)
        @activities = activities
        @activities_count = activities.size
        @total_count = total_count
        @page = page
        @per_page = per_page
      end

      def from
        @page == 1 ? 1 : (@page - 1) * @per_page
      end

      def to
        ((@page - 1) * @per_page) + @activities_count
      end

      def previous_page?
        @page != 1
      end

      def next_page?
        @activities_count == @per_page
      end
    end
  end
end