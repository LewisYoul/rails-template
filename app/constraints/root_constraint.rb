class RootConstraint
  def matches?(request)
   request.session[:user_id].present? || request.cookies[:remember_token].present?
  end
end