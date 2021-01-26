module Consultoria
	class Task < ApplicationRecord
	  belongs_to :checklist, foreign_key: 'consultoria_checklist_id'
	end
end
