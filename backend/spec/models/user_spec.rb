require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      user = User.new(
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        bio: 'This is a test bio.'
      )
      expect(user).to be_valid
    end

    it 'is invalid without a name' do
      user = User.new(
        email: 'test@example.com',
        password: 'password',
        name: nil
      )
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("can't be blank")
    end

    it 'is invalid with a name longer than 50 characters' do
      user = User.new(
        email: 'test@example.com',
        password: 'password',
        name: 'A' * 51
      )
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include('is too long (maximum is 50 characters)')
    end

    it 'is valid with an empty bio' do
      user = User.new(
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        bio: nil
      )
      expect(user).to be_valid
    end

    it 'is invalid with a bio longer than 300 characters' do
      user = User.new(
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        bio: 'A' * 301
      )
      expect(user).not_to be_valid
      expect(user.errors[:bio]).to include('is too long (maximum is 300 characters)')
    end
  end
end