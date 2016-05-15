class User < ActiveRecord::Base
  has_many :workout_plans, dependent: :destroy
  has_many :workouts, through: :workout_plans
  enum role: [:user, :guest, :admin]
  after_initialize :set_default_role, :if => :new_record?

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook]

  def set_default_role
    self.role ||= :user
  end

  def user_name
    name ? name.split(' ').first.capitalize : email.split('@').first.capitalize
  end

  def current_plan
    @current_plan ||= workout_plans.last
  end

  def new_plan
    WorkoutPlan.create(user_id: self.id)
  end

  # Class Methods
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
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
