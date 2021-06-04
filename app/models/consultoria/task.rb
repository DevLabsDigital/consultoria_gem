module Consultoria
	class Task < ApplicationRecord
	  belongs_to :checklist, foreign_key: 'consultoria_checklist_id'
	  default_scope ->(){order(:created_at)}
	end
end
