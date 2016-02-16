class User < ActiveRecord::Base
  has_many :workout_plans
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook]

  def current_plan
    if workout_plans.empty?
      WorkoutPlan.create(user_id: self.id)
    else
      self.workout_plans.last
    end
  end

  # Class Methods
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
     user.uid = user.uid
     user.name = auth.info.name
     user.password = Devise.friendly_token[0,20]
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
end
