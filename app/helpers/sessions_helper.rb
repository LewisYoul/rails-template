module SessionsHelper
  def log_in(user)
    remember_token = User.new_token

    user.update!(remember_token: remember_token)

    cookies.permanent[:remember_token] = remember_token
    session[:user_id] = user.id
  end

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    elsif cookies.permanent[:remember_token]
      user = User.find_by(remember_token: cookies.permanent[:remember_token])

      if user
        log_in(user)
        @current_user = user
      end
    end
  end

  def forget
    return unless current_user

    current_user.update!(remember_token: nil)

    session.delete(:user_id)
    cookies.delete(:remember_token)
  end
end
