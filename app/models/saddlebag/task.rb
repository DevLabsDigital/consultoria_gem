module Saddlebag
	class Task < ApplicationRecord
	  belongs_to :checklist, foreign_key: 'saddlebag_checklist_id'
	end
end
