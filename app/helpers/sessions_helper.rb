module SessionsHelper
  def log_in(user)
    remember_token = User.new_token

    user.update!(remember_token: remember_token)

    cookies.permanent[:remember_token] =  { value: remember_token, domain: :all }
    session[:user_id] = user.id
  end

  def current_user
    Rails.logger.info("\n\n\nSession User ID: #{session[:user_id]}\n\n\n")
    Rails.logger.info("\n\n\nRemember Token: #{cookies.permanent[:remember_token]}\n\n\n")

    @current_user ||= if session[:user_id]
      user = User.find_by(id: session[:user_id])

      if user
        user
      else
        clear_session_and_cookies

        nil
      end
    elsif cookies.permanent[:remember_token]
      user = User.find_by(remember_token: cookies.permanent[:remember_token])

      if user
        log_in(user)
        
        user
      end
    end
  end

  def forget
    return unless current_user

    current_user.update!(remember_token: nil)

    clear_session_and_cookies
  end

  private

  def clear_session_and_cookies
    session.delete(:user_id)
    cookies.delete(:remember_token, domain: :all)
  end
end
