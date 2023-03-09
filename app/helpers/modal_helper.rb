module ModalHelper
  def modal_header(text)
    raw("
      <h5 class='text-sm font-semibold mb-1'>#{text}</h5>
      <hr>
    ")
  end
end