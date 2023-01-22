class Bbox
  def initialize(bbox_string)
    raise NotImplementedError unless bbox_string && bbox_string.length > 0

    @bbox_string = bbox_string
  end

  
  def southwest_lng
    @southwest_lng ||= bbox_array[0]
  end

  def southwest_lat
    @southwest_lat ||= bbox_array[1]
  end
  
  def northeast_lng
    @northeast_lng ||= bbox_array[2]
  end
  
  def northeast_lat
    @northeast_lat ||= bbox_array[3]
  end
  
  private
  
  def bbox_array
    @bbox_array ||= @bbox_string.split(',').map(&:to_f)
  end
end