<script type="text/javascript">
    $(document).ready(function() {

      $('UL.accordion_menu>LI>A').click(function() {
        current_li = $(this).parent();
        current_li.children('UL').slideDown('normal');
        current_li.siblings().children('UL').slideUp('normal');  
      });
      
      $('UL.accordion_menu>LI>UL').hide();
    });
  </script>